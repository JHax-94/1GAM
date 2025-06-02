using UnityEngine;
using System.Collections;

public class bulletTime : MonoBehaviour {

	float lifetime = 2f;

	void OnCollisionEnter2D()
	{
		Destroy (gameObject);
	}

	// Use this for initialization
	void Start () 
	{
		GetComponent<Rigidbody2D>().velocity =  5f*transform.right;
	}
	
	// Update is called once per frame
	void Update () 
	{
		lifetime -= Time.fixedDeltaTime;
		if(lifetime < 0)
		{
			Destroy(gameObject);
		}
	}
}
