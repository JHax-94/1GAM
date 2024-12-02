#pragma strict

var ID : int;
var characterName : String;
var characterImage : Texture2D;

var galleryScript : galleryControl;

function OnMouseOver()
{
	if(galleryScript.Done != true)
	{
		Debug.Log("HOVERHOVERHOVERHOVERHOVER");
		
		galleryScript.hoverString = characterName;
		galleryScript.characterGUI.normal.background = characterImage;
		
		if(Input.GetMouseButton(0))
		{
			galleryScript.chooseCharacter(ID);
			Destroy(gameObject);
		}
	}
}

function Start () 
{
	galleryScript = transform.parent.GetComponent(galleryControl);
}

function Update () {

}