class Book::Photo < Book
	def self.get_dominant_color isbn
		image_service_url = Rails.application.config.image_service
		image_url = "http://covers.openlibrary.org/b/isbn/" + isbn.split(",").first + "-M.jpg" rescue ""
		dominant_color = nil
		if image_url.present?
			request = image_service_url + "?image_url=" + image_url
			dominant_color = Net::HTTP.get(URI.parse(request))
		end
		dominant_color
	end
end