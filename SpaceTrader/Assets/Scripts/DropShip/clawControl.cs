using UnityEngine;
using System.Collections;

public class clawControl : MonoBehaviour {

	public SpriteRenderer renderControl;

	public Sprite Closed;
	public Sprite Open;

	bool open = false;

	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () 
	{
		if(!open)
		{
			if(Input.GetKey(KeyCode.Return) || Input.GetKey(KeyCode.JoystickButton0)) 
			{
				renderControl.sprite = Open;
			}
		}
	}
}
