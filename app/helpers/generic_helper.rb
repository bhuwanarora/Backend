module GenericHelper
	def self.set_up_redis label, key
		(max_id,min_id) = Neo.get_max_min_id label
		cur_id = RedisHelper.set_up_redis key, min_id
		{:cur_id => cur_id, :max_id => max_id}
	end

	def self.update_redis key, value
		RedisHelper.update_redis key, value
	end

	def self.get_files_in_directory directory, file_regex = '*'
		Dir[directory + "/" + file_regex]
	end

	def self.recursively_create_directories directory
		require 'fileutils'
		FileUtils.mkdir_p directory
	end
end