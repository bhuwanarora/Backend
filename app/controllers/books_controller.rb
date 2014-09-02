class BooksController < ApplicationController
  before_action :set_book, only: [:show, :edit, :update, :destroy]
  include TrendsHelper
  include FlickrHelper

  # GET /books
  # GET /books.json
  def index
    @books = Book.all.limit(10)
  end

  def cover_photos
    neo = Neography::Rest.new
    clause  = "MATCH (c:CoverPhoto) RETURN c.url, ID(c), c.status"
    @urls = neo.execute_query(clause)["data"]
    # @urls = FlickrHelper.get_cover_photos
  end

  def set_active_cover_photo
    begin
      neo = Neography::Rest.new
      clause = "MATCH (c:CoverPhoto) WHERE ID(c)="+params[:id].to_s+" SET c.status=true"
      puts clause.blue.on_red
      neo.execute_query clause
      render :json => {:message => "Success"}, :status => 200
    rescue Exception => e
      render :json => {:message => e.to_s}, :status => 500
    end
  end

  # GET /books/1
  # GET /books/1.json
  def show

  end

  # GET /books/new
  def new
    @book = Book.new
  end

  def book_detail
    
  end

  # def dates
  #   "MATCH (a:Author) WHERE a.birthdate <> '' RETURN a.name, a.birthdate, a.birthplace, a.nationality, a.gender, a.official website, a.date_of_death, a.wiki_url LIMIT 10"
  # end

  def delete_grid
    begin
      neo = Neography::Rest.new
      clause = "MATCH (bg:BookGrid) WHERE ID(bg)="+params[:id].to_s+" OPTIONAL MATCH (bg)-[r:RelatedBooks]->()  DELETE bg, r"
      puts clause.blue.on_red
      neo.execute_query clause
      render :json => {:message => "Success"}, :status => 200
    rescue Exception => e
      puts e
      render :json => {:message => e}, :status => 500
    end
  end

  def add_grid
    begin
      neo = Neography::Rest.new
      indexed_name = params[:grid_name].downcase.gsub("\"", "").gsub("'", "").gsub(" ", "").gsub("-", "").gsub(":", "") rescue ""
      clause = "CREATE (bg:BookGrid{name:\""+params[:grid_name].to_s+"\"}) SET bg.indexed_grid_name=\""+indexed_name+"\", bg.priority=0"
      neo.execute_query clause
      render :json => {:message => "Success"}, :status => 200
    rescue Exception => e
      puts e
      render :json => {:message => e}, :status => 500
    end
  end

  def reset_grid_links
    begin
      @neo = Neography::Rest.new
      clause = "MATCH (:BookGrid)-[r:NextGrid]->(:BookGrid) DELETE r"
      puts clause.blue.on_red
      @neo.execute_query clause

      clause = "MATCH (grid:BookGrid) WHERE grid.status = 1 WITH grid ORDER BY grid.priority DESC WITH collect(grid) as p FOREACH(i in RANGE(0, length(p)-2) |  FOREACH(p1 in [p[i]] | FOREACH(p2 in [p[i+1]] | CREATE UNIQUE (p1)-[:NextGrid]->(p2))))"
      puts clause.blue.on_red
      @neo.execute_query clause  

       
      render :json => {"message" => "Success"}, :status => 200
    rescue Exception => e
      render :json => {:error => e}, :status => 500
    end
  end

  def update_grid
    begin
      neo = Neography::Rest.new
      if params[:grid_id]
        book_ids = params[:book_ids].gsub("[", "").gsub("]", "").split(",") rescue ""
        id_string = ""
        clause = "MATCH (bg:BookGrid)-[r:RelatedBooks]->(:Book) WHERE ID(bg)="+params[:grid_id]+" DELETE r"
        neo.execute_query clause
        if book_ids.present?
          for book_id in book_ids
            if book_id.present?
              if id_string.present?
                id_string = id_string + " OR ID(b) = " + book_id
              else
                id_string = id_string + " AND (ID(b) = " + book_id
              end
            end
          end
          id_string = id_string + ")"
          if params[:status]=="true"
            clause = "MATCH (b:Book), (bg:BookGrid) WHERE ID(bg)="+params[:grid_id]+id_string+" SET bg.status = 1, bg.priority="+params[:priority].to_s+", bg.name=\""+params[:name]+"\" CREATE UNIQUE (bg)-[:RelatedBooks]->(b)"
          else
            clause = "MATCH (b:Book), (bg:BookGrid) WHERE ID(bg)="+params[:grid_id]+id_string+" SET bg.status = 0, bg.priority="+params[:priority].to_s+", bg.name=\""+params[:name]+"\" CREATE UNIQUE (bg)-[:RelatedBooks]->(b)"
          end
        else
          if params[:status]=="true"
            clause = "MATCH (bg:BookGrid) WHERE ID(bg)="+params[:grid_id]+id_string+" SET bg.status = 1, bg.priority="+params[:priority].to_s+", bg.name=\""+params[:name]+"\""
          else
            clause = "MATCH (bg:BookGrid) WHERE ID(bg)="+params[:grid_id]+id_string+" SET bg.status = 0, bg.priority="+params[:priority].to_s+", bg.name=\""+params[:name]+"\""
          end
        end

        puts clause.blue.on_red
        neo.execute_query clause
      end
      render :json => {:message => "Success"}, :status => 200
    rescue Exception => e
      render :json => {:error => e}, :status => 500
    end
    
  end

  def grids
    neo = Neography::Rest.new

    clause = "MATCH (bg:BookGrid) OPTIONAL MATCH (bg)-[:RelatedBooks]->(b:Book) RETURN bg.name, bg.timestamp, ID(bg), COLLECT(b.title), bg.status, COLLECT(ID(b)), bg.priority"
    puts clause.blue.on_red
    @grids = neo.execute_query(clause)["data"]
  end

  def add_label
    begin
      neo = Neography::Rest.new
      indexed_name = params[:name].downcase.gsub(" ", "")
      clause = "MERGE (label:Label{indexed_label_name:\""+indexed_name+"\"}) SET label.name = UPPER(\""+params[:name].strip.to_s+"\")"
      puts clause.blue.on_red
      neo.execute_query clause
      render :json => {:message => "Success"}, :status => 200
    rescue Exception => e
      render :json => {:error => e}, :status => 500
    end
  end

  def remove_label
    begin
      neo = Neography::Rest.new
      clause = "MATCH (label:Label) WHERE ID(label)="+params[:label_id].to_s+" DELETE label"
      puts clause.blue.on_red
      neo.execute_query clause
      render :json => {:message => "Success"}, :status => 200
    rescue Exception => e
      render :json => {:error => e}, :status => 500
    end
  end

  def labels
    neo = Neography::Rest.new

    if params[:label_id]
      book_ids = params[:book_ids].gsub("[", "").gsub("]", "").split(",") rescue ""
      id_string = ""
      clause = "MATCH (l:Label)-[r:BookmarkedOn]->(:Book) WHERE ID(l)="+params[:label_id]+" DELETE r"
      neo.execute_query clause
      if book_ids.present?
        for book_id in book_ids
          if book_id.present?
            if id_string.present?
              id_string = id_string + " OR ID(b) = " + book_id
            else
              id_string = id_string + " AND (ID(b) = " + book_id
            end
          end
        end
        id_string = id_string + ")"
        if params[:status]
          clause = "MATCH (b:Book), (l:Label) WHERE ID(l)="+params[:label_id]+id_string+" SET l.status = 1 CREATE UNIQUE (l)-[:BookmarkedOn]->(b)"
        else
          clause = "MATCH (b:Book), (l:Label) WHERE ID(l)="+params[:label_id]+id_string+" SET l.status = 0 CREATE UNIQUE (l)-[:BookmarkedOn]->(b)"
        end
      else
        if params[:status]
          clause = "MATCH (l:Label) WHERE ID(l)="+params[:label_id]+id_string+" SET l.status = 1"
        else
          clause = "MATCH (l:Label) WHERE ID(l)="+params[:label_id]+id_string+" SET l.status = 0"
        end
      end
      puts clause.blue.on_red
      neo.execute_query clause
    end

    clause = "MATCH (l:Label) OPTIONAL MATCH (l)-[:BookmarkedOn]->(b:Book) RETURN l.name, l.timestamp, ID(l), COLLECT(b.title), l.status, COLLECT(ID(b)), l.primary_label"
    puts clause.blue.on_red
    @labels = neo.execute_query(clause)["data"]
  end

  def trending_new_books
      TrendsHelper.link_new_books(params[:id], params[:q])
      render :json => {:message => "Success"}, :status => 200
    begin
    rescue Exception => e
      render :json => {:message => e}, :status => 500
    end
  end

  def trends
    neo = Neography::Rest.new

    if params[:trending_id]
      book_ids = params[:book_ids].gsub("[", "").gsub("]", "").split(",") rescue ""
      id_string = ""
      clause = "MATCH (t:Trending)-[r:RelatedBooks]->(:Book) WHERE ID(t)="+params[:trending_id]+" DELETE r"
      neo.execute_query clause
      if book_ids.present?
        for book_id in book_ids
          if book_id.present?
            if id_string.present?
              id_string = id_string + " OR ID(b) = " + book_id
            else
              id_string = id_string + " AND (ID(b) = " + book_id
            end
          end
        end
        id_string = id_string + ")"
        if params[:status]
          clause = "MATCH (b:Book), (t:Trending) WHERE ID(t)="+params[:trending_id]+id_string+" SET t.status = 1 CREATE UNIQUE (t)-[:RelatedBooks]->(b)"
        else
          clause = "MATCH (b:Book), (t:Trending) WHERE ID(t)="+params[:trending_id]+id_string+" SET t.status = 0 CREATE UNIQUE (t)-[:RelatedBooks]->(b)"
        end
      else
        if params[:status]
          clause = "MATCH (t:Trending) WHERE ID(t)="+params[:trending_id]+id_string+" SET t.status = 1"
        else
          clause = "MATCH (t:Trending) WHERE ID(t)="+params[:trending_id]+id_string+" SET t.status = 0"
        end
      end
      puts clause.blue.on_red
      neo.execute_query clause
    end

    clause = "MATCH (t:Trending) OPTIONAL MATCH (t)-[:RelatedBooks]->(b:Book) RETURN t.name, t.timestamp, ID(t), COLLECT(b.title), t.status, COLLECT(ID(b)), t.title, t.content, t.searched_words, t.url, t.thumbnail_url, t.redirect_url, t.publisher, t.thumb ORDER BY t.timestamp DESC LIMIT 50 "
    puts clause.blue.on_red
    @trends = neo.execute_query(clause)["data"]

  end

  def search_book
    tags = Api::V0::SearchApi.search_books params[:q]
    render :json => tags, :status => 200
  end

  # GET /books/1/edit
  def edit
  end

  def count
    neo = Neography::Rest.new
    tags = params[:q]
    # count = neo.execute_query("MATCH (b:Book)-[:Belongs_to]->(g:Genre) WHERE g.name=''")
    render :json => {:count => 1}, :status => 200
  end

  def thumbs
    neo = Neography::Rest.new
    clause = "MATCH (u:User)-[:DataEdit]->(t:ThumbRequest)-[:DataEditRequest]->(b:Book) RETURN ID(u), ID(b), u.name, b.title, b.author_name, t.url, ID(t), t.status"
    @requests = neo.execute_query(clause)["data"]
  end

  def update_thumb_status
    begin
      BooksGraphHelper.approve_thumb_request(params[:status], params[:id])
      render :json => {:message => "Success"}, :status => 200
    rescue Exception => e
      render :json => {:message => e}, :status => 500
    end
  end

  # POST /books
  # POST /books.json
  def create
    @book = Book.new(book_params)

    respond_to do |format|
      if @book.save
        format.html { redirect_to @book, notice: 'Book was successfully created.' }
        format.json { render action: 'show', status: :created, location: @book }
      else
        format.html { render action: 'new' }
        format.json { render json: @book.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /books/1
  # PATCH/PUT /books/1.json
  def update
    respond_to do |format|
      if @book.update(book_params)
        format.html { redirect_to @book, notice: 'Book was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: 'edit' }
        format.json { render json: @book.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /books/1
  # DELETE /books/1.json
  def destroy
    @book.book_identifier.delete rescue nil
    @book.destroy
    respond_to do |format|
      format.html { redirect_to books_url }
      format.json { head :no_content }
    end
  end

  def search
    render 'search'
  end

  def find_by_isbn
    # @isbn_number = params[:book]
    # log_searched_query
    # @book = Book.find_by_isbn @isbn_number
    @results = Book.search(params[:book])
    render 'search'
  end

  def remove_tag
    set_book
    @tag = Tag.where(:name => params[:tag]).first
    @tags = @book.tags
    @tags = @tags - [@tag]
    @book.tags = @tags
    if @book.save
      handle_queue(ProcessTag::DELETE)
      log_remove_tag
      render :json => {:message => "Success"}, :status => 200
    else
      render :json => {:message => "Error"}, :status => 500
    end
  end

  def add_tag
    set_book
    @tag = Tag.where(:name => params[:tag]).first
    @tags = @book.tags
    @tags = @tags + [@tag]
    @book.tags = @tags
    if @book.save
      handle_queue(ProcessTag::ADD)
      log_add_tag
      render :json => {:message => "Success"}, :status => 200
    else
      render :json => {:message => "Error"}, :status => 500
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_book
      @book = Book.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def book_params
      params[:book]
    end

end
