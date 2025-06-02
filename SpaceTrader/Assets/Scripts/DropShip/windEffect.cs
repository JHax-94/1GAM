using UnityEngine;
using System.Collections;

public class windEffect : MonoBehaviour {

	public Transform shipTrans;
	public Rigidbody2D shipBody;
	public float windSpeed = 0;
	float height = 0;

	public void setHeight(float newHeight)
	{
		height = newHeight;
	}
	// Update is called once per frame
	void Update () 
	{

		if(Time.timeScale > 0 && shipTrans.position.y > 5 && shipTrans.position.y < height-5) shipBody.AddForce(new Vector2(windSpeed, 0f)/50);


	}
}
