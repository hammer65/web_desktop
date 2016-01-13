<html>
<head>
  <title>test page</title>
  <link rel="stylesheet" type="text/css" href="css/external.css" />
  <script type="text/javascript" src="js/external.js"></script>
</head>
<body style="font-size:16px">
  <h1>Test</h1>
  <img src="images/htm_baby.jpg" />
  <br clear="all" />
  <a href="http://google.com">click</a>
  <strong><?php echo "Hello World  ".$_SERVER['SCRIPT_FILENAME'] ?></strong>
  <div>
    <textarea cols="20" rows="10" style="font-size:20;font-weight:bold"><?php  echo print_r($_SERVER) ?></textarea>
  </div>
  <h2>http://<?php echo $_SERVER['HTTP_HOST']; ?>/info.php</h2>
  <div>
    <a href="/info.php">Info</a>
  </div>
</body>
</html>