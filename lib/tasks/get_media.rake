namespace :get_media do

    desc "Get News"
    task :news => :environment do
        puts "init"
        include NewsHelper
        NewsHelper.insert_news
    end

    desc "Get Blog"
    task :blog => :environment do
        puts "init blog service"
        include BlogsHelper
        BlogsHelper.handle
    end

    desc "Get Literature news"
    task :old_lit_news => :environment do
        puts "init"
        include NewsHelper
        NewsHelper.insert_old_lit_news
    end

    desc "Get facebook likes"
    task :fb_likes => :environment do
        FacebookLikesHelper.fetch_backlog_likes
    end

    desc "Get facebook books"
    task :fb_books => :environment do
        FacebookBooksHelper.fetch_backlog_books
    end

    desc "complete info of unfinished facebook books"
    task :fb_books_info => :environment do
        FacebookBooksHelper.fetch_backlog_books_info
    end

end