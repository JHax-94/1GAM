using UnityEngine;
using System.Collections;

public class cameraTrack : MonoBehaviour {

	public Rigidbody2D Fishbody;
	public Rigidbody CameraBody;

	public float cameraSpeed = 0;


	IEnumerator incrementSpeed()
	{
		while (Time.deltaTime > 0)
		{
			CameraBody.velocity = CameraBody.velocity + new Vector3(-0.1f, 0f, 0f);

			yield return new WaitForSeconds(1.5f);




		}


	}

	void Start()
	{
		StartCoroutine(incrementSpeed());

	}

	// Use this for initialization
	//void Start () {
	
	//}
	
	// Update is called once per frame
	
}
