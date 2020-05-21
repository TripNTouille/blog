module Jekyll
    class RecipeCountryPageGenerator < Generator
        safe true

        def generate(site)
            recipes_by_country = site.collections['recipes'].docs.group_by{ |recipe| recipe.data['country'].downcase }

            recipes_by_country.each do |country, recipes|
                dir = 'recettes-pays'
                site.pages << RecipeCountryPage.new(site, site.source, dir, country, recipes)
            end
        end
    end

    # A Page subclass used in the `RecipeCountryPage`
    class RecipeCountryPage < Page
        def initialize(site, base, dir, country, recipes)
            @site = site
            @base = base
            @dir = dir
            @name = country + '.html'
            
            self.process(@name)
            self.read_yaml(File.join(base, '_layouts'), 'recettes-pays.html')
            self.data['country'] = country
            self.data['posts'] = recipes
            
            self.data['title'] = "Recettes - #{country.capitalize}"
        end
    end
end
