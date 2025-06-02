using UnityEngine;
using System.Collections;

public class gunControls : MonoBehaviour {

	public Transform motherTransform;

	public float reloadSpeed = 1f;
	public GameObject Bullet;


	float reloadTimer = 0f;

	GameObject tempObj;

	// Update is called once per frame
	void Update () 
	{
		if(reloadTimer > 0)
		{
			reloadTimer -= Time.deltaTime;
		}
		else
		{
			reloadTimer = 0;
		}


		if((Input.GetAxis ("Triggers") < 0 || Input.GetKey (KeyCode.Space)) && reloadTimer == 0)
		{
			reloadTimer = reloadSpeed;
			tempObj = Instantiate (Bullet, transform.position+0.3f*transform.right, transform.localRotation) as GameObject;
			tempObj.transform.parent = motherTransform;
		}
	}
}
