# axios 跨域请求的问题

axios 首先向要请求的服务器，发送一条 methond 为“options” 的请求，服务器不返回具体内容，但是会返回一些 header 信息。返回的信息会在下次正式请求时用到，判断是否你允许你跨域。

具体配置，主要涉及 NGINX 和后端。我使用的是 nginx 和 PHP(laravel)

## nginx

```shell
location / {
        add_header Access-Control-Allow-Origin http://test.starimg.cn;
        add_header Access-Control-Allow-Headers *;
        add_header Access-Control-Allow-Methods GET,POST,PUT,DELETE,OPTIONS;
        if ($request_method = 'OPTIONS') {
         return 204;
    }
}
```

## laravel

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
            $response->header('Access-Control-Allow-Headers', 'Origin, Content-Type, Cookie, X-CSRF-TOKEN, Accept, Authorization, X-XSRF-TOKEN');
            $response->header('Access-Control-Allow-Headers', 'Origin,  Cookie, X-CSRF-TOKEN, Accept, X-XSRF-TOKEN');
            $response->header('Access-Control-Allow-Headers', '*');
            $response->header('Access-Control-Expose-Headers', 'Authorization, authenticated');
            $response->header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, OPTIONS');
            $response->header('Access-Control-Allow-Credentials', false);
            $response->header('Access-Control-Allow-Headers', 'x-csrf-token,x-requested-with');
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
