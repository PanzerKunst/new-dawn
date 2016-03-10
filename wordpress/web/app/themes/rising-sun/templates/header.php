<?php use Roots\Sage\RisingSun; ?>

<header class="banner">
  <div class="container" <?= RisingSun\header_style(); ?>>
    <div>
      <a class="brand" href="<?= esc_url(home_url('/')); ?>"><?php bloginfo('name'); ?></a>
    </div>

    <h1><?php bloginfo('description'); ?></h1>

    <p><span>1-3</span><span>July</span><span>2016,</span><span>Växjö</span></p>
  </div>
  <div id="menu-btn-wrapper">
    <button class="styleless"></button>
  </div>
  <nav class="nav-primary">
    <?php
    if (has_nav_menu('primary_navigation')) :
      wp_nav_menu([
        'theme_location' => 'primary_navigation',
        'menu_class' => 'nav',
        'walker' => new RisingSun\Walker_Main_Menu()
      ]);
    endif;
    ?>
  </nav>
</header>
