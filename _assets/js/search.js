// detects if the user has scrolled down
function _user_has_scrolled_down() {
  return $(window).scrollTop() > 0;
}

// toggles the display of node
// returns true if the node is displayed after function call
function _toggle_display(node_id, force_display) {
  const element = document.getElementById(node_id);
  const is_not_displayed = element.style.display === 'none';
  const to_be_displayed = is_not_displayed || force_display;
  element.style.display = (to_be_displayed ? '' : 'none');
  return to_be_displayed;
}

// displays the node (if needed) and scrolls to it
function toggle_display(node_id) {
  if (_toggle_display(node_id, _user_has_scrolled_down()))
    $('html,body').animate({scrollTop: 0}, 500);
}

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
        routing: true,
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
                    return `Aucun résultat ne correspond à <q>${ results.query }</q>`;
                },
                item(hit) {
                    return `
                    <a href=${ hit.url }>
                    <div class="hit_title">${ instantsearch.highlight({ "attribute": "title", hit }) }</div>
                    <div class="hit_content">${ instantsearch.highlight({ "attribute": "content", hit }) }</div>
                    </a>
                    `;
                },
            }
        }),

        instantsearch.widgets.poweredBy({
          container: '#poweredby'
        }),
    ]);

    search.start();

    /* FIXME: not handling the click on hits properly
    // When input loses focus, hide search results
    document.querySelector('#searchbox .ais-SearchBox-input').addEventListener('blur', function() {
        const search_hits = document.querySelector('#hits');
        search_hits.style.display = 'none';
    });
    */
    // when search input gains focus
    document.querySelector('#searchbox .ais-SearchBox-input').addEventListener('focus', function() {
        // display results
        // const search_hits = document.querySelector('#hits');
        // search_hits.style.display = '';
        // close menu on mobile display
        document.querySelector('#site-navigationbwrap').classList.remove('toggled');
    });
})();
