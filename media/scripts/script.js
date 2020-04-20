// $(document).ready(function() {
$(window).on("load", function() {
  // alert("All pictures loaded")
  $('.table-pinned').each(function() {
    (new FixTableColumns(this)).render();
  })

  $(function () {
    $('[data-toggle="tooltip"]').tooltip({
      html: true
    });
  })
});

function FixTableColumns(fixedcolumns) {
  this.fixedcolumns = fixedcolumns;

  this.render = function() {
    var $table = $(this.fixedcolumns);
    var backgroundcolor = $(this.fixedcolumns).css("background-color");
    console.log("background-color: " + backgroundcolor);
    var $fixedColumn = $table.clone().insertBefore($table).addClass('fixed-column');
    $fixedColumn.find('th,td').not('.pinned').remove();
    $fixedColumn.find('tr').each(function (i, elem) {
      $(this).height($table.find('tr:eq(' + i + ')').height());
    });
    $fixedColumn.width($table.find('th,td').width()+15);
    $fixedColumn.css('background-color',backgroundcolor).addClass('pinned-column-shadow');
  }
}

// smooth scroll
// Select all links with hashes
$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .not('[href="#carousel"]')
  .not('[href^="#tabs"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
      && 
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          };
        });
      }
    }
  });