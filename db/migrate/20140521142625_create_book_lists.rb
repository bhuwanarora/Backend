class CreateBookLists < ActiveRecord::Migration
  def change
    create_table :book_lists do |t|
    	t.string :name

      t.timestamps
    end
  end
end
