<footer class="content-info">
  <div class="container">
    <?php dynamic_sidebar('sidebar-footer');

    if (is_home()) { ?>
      <p>Do you have a question?<br />
        Ask it in the <a href="https://www.facebook.com/groups/risingsunfestival" target="_blank">Rising Sun Facebook group</a>!</p>
    <?php } else { ?>
      <a href="/" class="fa fa-home"></a>
    <?php } ?>
  </div>
</footer>
