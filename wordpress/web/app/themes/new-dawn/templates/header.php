<header class="banner">
  <div class="container" style="background-image: url(<?php header_image(); ?>)">
    <h1>
      <a class="brand" href="<?= esc_url(home_url('/')); ?>"><?php bloginfo('name'); ?></a>
      <?php bloginfo('description'); ?>
    </h1>

    <p><span>1-3</span><span>July</span><span>2016,</span><span>Växjö</span></p>
  </div>
  <div id="menu-btn-wrapper">
    <button class="styleless"></button>
  </div>
  <nav class="nav-primary">
    <?php use Roots\Sage\NewDawn;

    if (has_nav_menu('primary_navigation')) :
      wp_nav_menu([
        'theme_location' => 'primary_navigation',
        'menu_class' => 'nav',
        'walker' => new NewDawn\Walker_Main_Menu()
      ]);
    endif;
    ?>
  </nav>
</header>
