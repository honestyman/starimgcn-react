# axios 跨域请求的问题

axios 首先向要请求的服务器，发送一条 methond 为“options” 的请求，服务器不返回具体内容，但是会返回一些 header 信息。返回的信息会在下次正式请求时用到，判断是否你允许你跨域。

具体配置，主要涉及 NGINX 和后端。我使用的是 nginx 和 PHP(laravel)

## 解决跨域问题

### nginx

```shell
location / {
        add_header Access-Control-Allow-Origin * ;
        add_header Access-Control-Allow-Headers 'Token,Origin,Content-Type, Cookie,X-CSRF-TOKEN,Accept,Authorization,X-XSRF-TOKEN,X-Requested-With' ;
        add_header Access-Control-Allow-Methods 'GET,POST,PUT,DELETE,OPTIONS' ;

        if ($request_method = 'OPTIONS') {
         return 204;
    }
}
```

### laravel

创建一个新的中间件 `CrossHttp` ，然后在 `Kernel.php` 文件中加载刚才注册的中间件。

具体内容如下：

```php
public function handle($request, Closure $next){
        $response = $next($request);

        $origin = $request->server('HTTP_ORIGIN') ? $request->server('HTTP_ORIGIN') : '';
        // 允许跨域的域名
        $allow_origin = [
            'http://localhost:3000',
            'http://localhost:5000',
        ];
        if (in_array($origin, $allow_origin)) {
            $response->header('Access-Control-Allow-Origin', $origin);
            //$response->header('Access-Control-Allow-Headers', 'x-csrf-token,x-requested-with');
            //$response->header('Access-Control-Allow-Headers', 'Origin, Content-Type, Cookie, X-CSRF-TOKEN, Accept, Authorization, X-XSRF-TOKEN');
            //$response->header('Access-Control-Allow-Headers', 'Origin,  Cookie, X-CSRF-TOKEN, Accept, X-XSRF-TOKEN');
            $response->header('Access-Control-Allow-Headers', '*');
            $response->header('Access-Control-Expose-Headers', 'Authorization, authenticated');
            $response->header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, OPTIONS');
            $response->header('Access-Control-Allow-Credentials', 'false');
        }
        return $response;
    }
```

```php
   // ----第一个方法----
   // 该方法会覆盖整个网站
   protected $middleware = [
      // ...
      //  \App\Http\Middleware\CrossHttp::class
    ];

    // ----第二个方法----
    /**
     * 路由中间件组
     * @var array
     */
    protected $middlewareGroups = [
        'web' => [
           // ...
        ],
        // 我使用的是这个，对访问量也进行了控制
        'api' => [
            'throttle:60,1',
            'bindings',
            'cross' => \App\Http\Middleware\CrossHttp::class
        ],
    ];
   // ----第三个方法----
    /**
     *路由中间件
     *
     * These middleware may be assigned to groups or used individually.
     *
     * @var array
     */
    protected $routeMiddleware = [
    //...
    'cross' => \App\Http\Middleware\CrossHttp::class
    ];
```

注册好直接，在 route 中使用。

```php
// 上面注册到中间件组 API 中了，所以可以在这里直接使用。
Route::group([
    'middleware' => ['api'],
    'domain' => 'api.***.cn'
], function () {
    // 具体路由
);}
```

## 二、 解释

### 1. **Access-Control-Allow-Origin**

服务器默认是不被允许跨域的。给Nginx服务器配置`Access-Control-Allow-Origin *`后，表示服务器可以接受所有的请求源（Origin）,即接受所有跨域的请求。

### 2. **Access-Control-Allow-Headers** 是为了防止出现以下错误：

``` code
Request header field Content-Type is not allowed by Access-Control-Allow-Headers in preflight response.
```

这个错误表示当前请求Content-Type的值不被支持。其实是我们发起了"application/json"的类型请求导致的。这里涉及到一个概念：`预检请求（preflight request）`,请看下面"预检请求"的介绍。

### 3. **Access-Control-Allow-Methods** 是为了防止出现以下错误：

``` code
Content-Type is not allowed by Access-Control-Allow-Headers in preflight response.
```

### 4.给`OPTIONS` 添加 `204`的返回，是为了处理在发送POST请求时Nginx依然拒绝访问的错误

发送"预检请求"时，需要用到方法 `OPTIONS` ,所以服务器需要允许该方法。

## 三、 预检请求（preflight request）

其实上面的配置涉及到了一个W3C标准：`CROS`,全称是跨域资源共享 (Cross-origin resource sharing)，它的提出就是为了解决跨域请求的。

> 跨域资源共享(CORS)标准新增了一组 HTTP 首部字段，允许服务器声明哪些源站有权限访问哪些资源。另外，规范要求，`对那些可能对服务器数据产生副作用的HTTP 请求方法（特别是 GET 以外的 HTTP 请求，或者搭配某些 MIME 类型的 POST 请求）`，浏览器必须首先使用 OPTIONS 方法发起一个预检请求（preflight request），从而获知服务端是否允许该跨域请求。服务器确认允许之后，才发起实际的 HTTP 请求。在预检请求的返回中，服务器端也可以通知客户端，是否需要携带身份凭证（包括 Cookies 和 HTTP 认证相关数据）。

其实`Content-Type字段的类型为application/json`的请求就是上面所说的`搭配某些 MIME 类型的 POST 请求`,CORS规定，Content-Type不属于以下MIME类型的，都属于预检请求：

``` code
application/x-www-form-urlencoded
multipart/form-data
text/plain
```

所以 application/json的请求 会在正式通信之前，增加一次"预检"请求，这次"预检"请求会带上头部信息 `Access-Control-Request-Headers: Content-Type`：

``` code
OPTIONS /api/test HTTP/1.1
Origin: http://foo.example
Access-Control-Request-Method: POST
Access-Control-Request-Headers: Content-Type
... 省略了一些
```

服务器回应时，返回的头部信息如果不包含`Access-Control-Allow-Headers: Content-Type`则表示不接受非默认的的Content-Type。即出现以下错误：

``` code
Request header field Content-Type is not allowed by Access-Control-Allow-Headers in preflight response.
```