(function start_search_engine() {
    const searchClient = algoliasearch('WMZ445EG6N', 'ec4a358a9ec50f1154907b40bd58ab9a');
    
    const search = instantsearch({
        indexName: 'prod_tripntouille',
        searchClient,
            searchFunction(helper) {
                const container = document.querySelector('#hits');
                if (helper.state.query === '') {
                    container.style.display = 'none';
                } else {
                    container.style.display = '';
                }
                helper.search();
            },
    });
    
    search.addWidgets([

        instantsearch.widgets.searchBox({
            container: '#searchbox',
            placeholder: 'Recherchez un article, une recette...',
            searchAsYouType: true,
            showSubmit: true,
        }),

        instantsearch.widgets.hits({
            container: '#hits',
            templates: {
                empty(results) {
                    return 'Aucun résultat ne correspond à <q>${ results.query }</q>';
                },
                item(hit) {
                    return `
                    <a href=${ hit.url }>
                    ${ instantsearch.highlight({ "attribute": "title", hit }) }
                    </a>
                    `;
                },
            }
        }),
    ]);

    search.start();
})();
