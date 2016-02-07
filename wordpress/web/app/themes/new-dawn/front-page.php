<?php use Roots\Sage\NewDawn;

wp_nav_menu([
  'theme_location' => 'primary_navigation',
  'menu_class' => 'menu styleless',
  'menu_id' => 'all-pages-as-single',
  'walker' => new NewDawn\Walker_Index_All_Pages_As_Single()
]);
