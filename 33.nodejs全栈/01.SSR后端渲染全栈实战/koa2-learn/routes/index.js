const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  console.log('自启动1')
  // 设置cookie
  ctx.cookies.set('pvid',Math.random());

  await ctx.render('index', {
    title: ctx.session.count
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json',
    cookie: ctx.cookies.get('pvid')
  }
})

router.get('/testAsync',async (ctx)=>{
  console.log('start',new Date().getTime());
  const a = await new Promise((resolve, reject)=>{
    setTimeout(()=>{
      resolve('a');
    },1000);
  });
  ctx.body = {
    a
  }
});

module.exports = router
