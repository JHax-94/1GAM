using UnityEngine;
using System.Collections;

public class MineControl : MonoBehaviour {

	public Transform TRANSFORM;
	public Rigidbody2D BODY;

	public Exploder EXPLOSION;

	int spawns = 0;

	IEnumerator Respawn()
	{


		yield return new WaitForSeconds(60f);

		Spawn ();

	}


	void OnCollisionEnter2D(Collision2D Hit)
	{


		if(Hit.collider.tag == "Net")
		{
			Pool ();
		}


	}

	void Pool()
	{
		TRANSFORM.position = new Vector3(20, 0, 1);
		StartCoroutine(Respawn ());
	}

	void Spawn()
	{
		spawns ++;
		EXPLOSION.Reset();
		TRANSFORM.position = new Vector3(-15f, (Random.value*5f-2.5f), 0f);
		BODY.GetComponent<Rigidbody2D>().velocity = new Vector3(spawns, 0, 0);



	}

	// Use this for initialization
	void Start () 
	{
		StartCoroutine (Respawn ());
	}
	/*
	// Update is called once per frame
	void Update () 
	{
	
	}
	*/
}
