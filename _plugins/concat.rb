module Jekyll
  module ConcatFilter
    def concat(first_array, second_array)
      first_array + second_array
    end
  end
end

Liquid::Template.register_filter(Jekyll::ConcatFilter)
