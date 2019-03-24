Jekyll::Hooks.register :site, :post_read do |site|
  site.collections['recipes'].docs.each do |recipe|
    generator = Jekyll::AutoImageGenerator.new
    generator.instance_variable_set(:@site, site)
    img = generator.get_image(recipe)
    recipe.data['image'] = img if img
  end
end
