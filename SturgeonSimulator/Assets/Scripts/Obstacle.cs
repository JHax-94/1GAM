using UnityEngine;
using System.Collections;

public class Obstacle : MonoBehaviour {

	public Transform TRANSFORM;
	public Rigidbody2D MECHANICS;


	public float startDelay;

	Vector3 safeSpawn;

	int Spawns = 0;

	IEnumerator Delay()
	{
		yield return new WaitForSeconds(startDelay);

		StartCoroutine(Respawn());

	}


	IEnumerator Respawn()
	{
		yield return new WaitForSeconds(60f);

		Spawn ();
	}

	void Spawn()
	{
		Spawns ++;

		TRANSFORM.position = new Vector3 (-15f, (Random.value*8f-4f), 0f);
		MECHANICS.velocity = new Vector3 (Spawns, 0f, 0f);



	}

	void Pool()
	{
		TRANSFORM.position = safeSpawn;
		MECHANICS.velocity = Vector3.zero;

		StartCoroutine(Respawn ());
	}

	void OnCollisionEnter2D(Collision2D Hit)
	{
		if(Hit.collider.tag == "Net")
		{
			Pool();

		}

	}


	// Use this for initialization
	void Start () 
	{
		safeSpawn = TRANSFORM.position;
		StartCoroutine(Delay ());
	}
	/*
	// Update is called once per frame
	void Update () {
	
	}
	*/
}
