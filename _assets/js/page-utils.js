/* hide the tag following *header_node* using jQuery *slideToggle*
 */
function switch_visibility(header_node) {
    $header = $(header_node);
    $content = $header.next();
    $content.slideToggle(500, function() {
    });
};
