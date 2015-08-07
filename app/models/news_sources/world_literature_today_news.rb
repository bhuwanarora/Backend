class NewsSources::WorldLiteratureTodayNews < NewsSources

	def self.get_source
		@@source||= 'http://www.worldliteraturetoday.org/events-news'
	end

	def self.get_news_info_css
		css_string = ['.views-row-taxonomy']
	end

	def self.fetch_news_info date = nil
		if date.nil?
			date = TimeHelper.today
		end
		params = {
			:class => WorldLiteratureTodayNews,
			:date => date
		}
		news_array = WorldLiteratureTodayNews.fetch_news_data params
		output = news_array.map{|news| WorldLiteratureTodayNews.get_metadata(news)}
	end

	def self.get_date news_info
		time_string = news_info.css('.views-field-field-date').text
		date = TimeHelper.extract_month_name_based_dates(time_string)[0]
		date
	end

	def self.filter_news news_data
		output = []
		news_data.each do |news|
			if !(news.css('.views-field-field-thumbnail .field-content a').attr('href').to_s.include? 'blog')
				output << news
			end
		end
		output
	end

	def self.get_metadata news_info
		time = Constant::Time
		date = WorldLiteratureTodayNews.get_date news_info
		partial_news_link = (news_info.css('.views-field-field-thumbnail .field-content a').attr('href').to_s.strip	rescue nil)
		complete_news_link = WorldLiteratureTodayNews.get_complete_news_link(partial_news_link, WorldLiteratureTodayNews.get_source) rescue nil
		metadata = {
			"image_url" 	=> (news_info.css('.views-field-field-thumbnail .field-content img').attr('src').to_s.strip	rescue nil),
			"title"			=> (news_info.css('.views-field-title h3 a').text.strip	rescue nil),
			"description"	=> (news_info.css('.summary').text.gsub(/\/\*.*\*\//,'')rescue nil),
			"news_link"		=> complete_news_link,
			"region"		=> nil,
			time::Year		=> date[time::Year],
			time::Month 	=> date[time::Month],
			time::Date 		=> date[time::Date]
		}
		metadata
	end
end