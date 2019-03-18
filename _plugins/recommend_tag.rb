module Jekyll
  class RecommendBlock < Liquid::Block

    def render(context)
      text = super
      site = context.registers[:site]
      converter = site.find_converter_instance(::Jekyll::Converters::Markdown)
      "<div class='four columns post-links'>#{converter.convert(text)}</div>"
    end
  end
end

Liquid::Template.register_tag('recommend', Jekyll::RecommendBlock)
