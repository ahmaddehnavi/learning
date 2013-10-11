<?php  if (!defined('BASEPATH')) exit('No direct script access allowed');

class Loginwithgoogle
{
	private $user_id;
	private $user_name;
	private $user_mail;
	private $profile_url;
	private $profile_image_url;
	private $authUrl;
	private $google_client_id = "616960038894.apps.googleusercontent.com";
	private $google_client_secret = "vuvWltW0EcmKoMsyx7Glg3Wd";
	private $google_redirect_url = "http://ahmaddehnavi.ir/panda/index.php/user/login";
	private $google_developer_key = "AIzaSyAuYQOlCyA5830VtBjl1d-HSfhlv6xcark";
	private $user_login = FALSE;

	public function __construct()
	{
		require_once 'Login_with_Google/Google_Client.php';
		require_once 'Login_with_Google/contrib/Google_Oauth2Service.php';

		session_start();

		$gClient = new Google_Client();
		$gClient->setApplicationName("Login to panda academy");
		$gClient->setClientId($this->google_client_id);
		$gClient->setClientSecret($this->google_client_secret);
		$gClient->setRedirectUri($this->google_redirect_url);
		$gClient->setDeveloperKey($this->google_developer_key);

		$google_oauthV2 = new Google_Oauth2Service($gClient);

		if (isset($_REQUEST['reset'])) {
			unset($_SESSION['token']);
			$gClient->revokeToken();
			header('Location: ' . filter_var($this->google_redirect_url, FILTER_SANITIZE_URL));
		}

		if (isset($_GET['code'])) {
			$gClient->authenticate($_GET['code']);
			$_SESSION['token'] = $gClient->getAccessToken();
			header('Location: ' . filter_var($this->google_redirect_url, FILTER_SANITIZE_URL));

			return;
		}

		if (isset($_SESSION['token'])) {
			$gClient->setAccessToken($_SESSION['token']);
		}


		if ($gClient->getAccessToken()) {
			//Get user details if user is logged in
			$user                    = $google_oauthV2->userinfo->get();
			$this->user_id           = $user['id'];
			$this->user_name         = filter_var($user['name'], FILTER_SANITIZE_SPECIAL_CHARS);
			$this->user_mail             = filter_var($user['email'], FILTER_SANITIZE_EMAIL);
			$this->profile_url       = filter_var($user['link'], FILTER_VALIDATE_URL);
			$this->profile_image_url = filter_var($user['picture'], FILTER_VALIDATE_URL);
//			$personMarkup      = "$email<div><img src='$profile_image_url?sz=50'></div>";
			$_SESSION['token'] = $gClient->getAccessToken();
		} else {
			//get google login url
			$this->authUrl = $gClient->createAuthUrl();
		}

		if (isset($this->authUrl)) {
			$this->user_login = FALSE;
		} else {
			$this->user_login = TRUE;
		}

		$this->CI =& get_instance();
	}

	public function is_logged_in()
	{
		return $this->user_login;
	}

	public function get_user_id()
	{
		return $this->user_id;
	}

	public function get_username()
	{
		return $this->user_name;
	}

	public function get_profile_url()
	{
		return $this->profile_url;
	}

	public function get_mail()
	{
		return $this->user_mail;
	}

	public function get_profile_image()
	{
		return $this->profile_image_url;
	}

	public function get_auth_url()
	{
		return $this->authUrl;
	}


}