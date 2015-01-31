var x = require('casper').selectXPath;
casper.options.viewportSize = {width: 1331, height: 683};
casper.on('page.error', function(msg, trace) {
   this.echo('Error: ' + msg, 'ERROR');
   for(var i=0; i<trace.length; i++) {
       var step = trace[i];
       this.echo('   ' + step.file + ' (line ' + step.line + ')', 'ERROR');
   }
});
casper.test.begin('Resurrectio test', function(test) {
   casper.start('http://www.160by2.com/Index');
   casper.waitForSelector("form[name=loginform] input[name='username']",
       function success() {
           test.assertExists("form[name=loginform] input[name='username']");
           this.click("form[name=loginform] input[name='username']");
       },
       function fail() {
           test.assertExists("form[name=loginform] input[name='username']");
   });
   casper.waitForSelector("input[name='username']",
       function success() {
           this.sendKeys("input[name='username']", "7275795405");
       },
       function fail() {
           test.assertExists("input[name='username']");
   });
   casper.waitForSelector("input[name='password']",
       function success() {
           this.sendKeys("input[name='password']", "123456");
       },
       function fail() {
           test.assertExists("input[name='password']");
   });
   casper.waitForSelector("form[name=loginform] button",
       function success() {
           test.assertExists("form[name=loginform] button");
           this.click("form[name=loginform] button");
       },
       function fail() {
           test.assertExists("form[name=loginform] button");
   });
   /* submit form */
   casper.wait(5000, function(){
    var a = this.getCurrentUrl();
    this.echo(this.getCurrentUrl());
    this.echo(a);
    for(var i = 0;i<a.length;i++){
      if(i>0){
        if(a[i]=='i'&&a[i+1])
      }
    }
    // var res = a.replace("Main", "SendSMS");
    // this.echo(res);
    // this.clickLabel('Send Free SMS', '');
    // casper.thenOpen(res);
    // this.echo(this.getCurrentUrl());
   });
    // casper.openUrl('http://www.160by2.com/SendSMS?id=42F6E9AA8C85E0A47BF9CD55C69DF92F.8515')
   casper.run(function() {test.done();});
});