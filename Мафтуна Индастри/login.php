<?php
// Simple server-side password check. Make sure your server supports PHP and runs this securely.
// Change $correct_password to a strong password and consider using HTTPS.
$correct_password = 'admin123';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $pw = isset($_POST['password']) ? $_POST['password'] : '';
    if ($pw === $correct_password) {
        header('Location: admin.html');
        exit;
    } else {
        // redirect back to the referring page with an error flag so JS opens modal
        $ref = isset($_SERVER['HTTP_REFERER']) ? $_SERVER['HTTP_REFERER'] : '/index.html';
        // strip existing query
        $ref = preg_replace('/\?.*/', '', $ref);
        header('Location: ' . $ref . '?login_error=1');
        exit;
    }
}
header('Location: index.html');
exit;
?>