/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */

         function notEmpty(data) {
           // 将相似的代码都移入到该方法中，避免重复编写相同代码。
            expect(data).toBeDefined();
            expect(data.length).not.toBe(0);
         }

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         // 编写一个测试遍历 allFeeds 对象里面的所有的源来保证有链接字段而且链接不是空的
         it('has URL defined and they are not empty', function() {
            allFeeds.forEach(function(feed) {
                notEmpty(feed.url);
                var regularExpressionUrl = /^((ht|f)tps?):\/\/([\w\-]+(\.[\w\-]+)*\/)*[\w\-]+(\.[\w\-]+)*\/?(\?([\w\-\.,@?^=%&:\/~\+#]*)+)?/; // 检查 URL 格式是否正确的正规表达式
                expect(feed.url).toMatch(regularExpressionUrl); // 检查格式
            });
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         // 编写一个测试遍历 allFeeds 对象里面的所有的源来保证有名字字段而且不是空的
         it('has name defined and they are not empty', function() {
            allFeeds.forEach(function(feed) {
                notEmpty(feed.name);
            });
        });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function() {
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
         // 写一个测试用例保证菜单元素默认是隐藏的
         it('is hidden', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
         });
         

         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
          // 当菜单图标被点击的时候菜单会切换可见状态
          it('changes visibility on click', function() {
            // 包含两个 expectation： 
            $('a.menu-icon-link').trigger('click'); // 当点击图标的时候菜单是否显示
            expect($('body').hasClass('menu-hidden')).toBe(false);
            $('a.menu-icon-link').trigger('click'); // 再次点击的时候是否隐藏
            expect($('body').hasClass('menu-hidden')).toBe(true);
          });
         
    });
    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
         // 测试保证 loadFeed 函数被调用而且工作正常
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        // 在 .feed 容器元素里面至少有一个 .entry 的元素
        it('are present', function() {
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });

    });
    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

         beforeEach(function(done) {
            loadFeed(0, function() {
                oldFeed = $('.feed').html();
                loadFeed(1, done);
            });
         });

         it('is different from old', function() {
            expect($('.feed').html()).not.toBe(oldFeed);
         });

    });     
}());
