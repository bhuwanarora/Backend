namespace :index do

	desc "index books"
	task :book => :environment do
	    Indexer.create_index_books
	end

	desc "index blog"
	task :blog => :environment do
	    Indexer.create_index("Blog", Blog)
	end

	desc "index news"
	task :news => :environment do
	    Indexer.create_index("News", News)
	end

	desc "index user"
	task :user => :environment do
	    Indexer.create_index("User", User)
	end

	desc "index author"
	task :author => :environment do
	    Indexer.create_index("Author", Author)
	end

	desc "index community"
  	task :community => :environment do
    	Indexer.create_index("Community", Community)
 	end

	desc "set index"
  	task :set_index => :environment do
    	Indexer.set_index 
 	end

 	desc "index all"
 	task :index_all => :environment do
		Indexer.set_index
		Indexer.create_index_books 		
		Indexer.create_index("Blog", Blog)
		Indexer.create_index("News", News)
		Indexer.create_index("User", User)
		Indexer.create_index("Author", Author)
		Indexer.create_index("Community", Community)
 	end
end
