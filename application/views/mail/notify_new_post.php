<h2>New post exist :</h2>
post :
<i>
	<?=$post_body?>
</i>
</br>
</br></br>
<?=anchor('academy/classes/view/'.$class_id,'click here to view your class.');?>
or go to <?=site_url('academy/classes/view/'.$class_id);?>