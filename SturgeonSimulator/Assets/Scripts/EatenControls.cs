using UnityEngine;
using System.Collections;

public class EatenControls : MonoBehaviour 
{



	HUG display;

	float spawnHeight; 

	int spawns = 1;

	Vector3 inertia =  new Vector3(1, 0, 0);



	IEnumerator Respawn()
	{


		GetComponent<Rigidbody2D>().velocity  = Vector3.zero; 
		spawnHeight = Random.value*8-4;

		yield return new WaitForSeconds(0.05f);

		transform.position = new Vector3(-15, spawnHeight, 0);
		yield return new WaitForSeconds(0.1f);
		
		

		GetComponent<Rigidbody2D>().velocity = new Vector3(inertia.x + spawns/10, 0, 0);
		spawns ++;
	}

	void OnTriggerEnter2D(Collider2D Hit)
	{
		//Debug.Log("Snail detects hit!");

		if(Hit.tag == "McFish")
		{
			//Debug.Log ("More points!");
			display.Points += 100;

		}

		StartCoroutine(Respawn ());

	}


	// Use this for initialization
	void Start () 
	{
		display = Camera.main.GetComponentInChildren<HUG>();
		transform.position = new Vector3(transform.position.x, Random.value*6-3, 0f);


		GetComponent<Rigidbody2D>().velocity = inertia;


	}

}
