using UnityEngine;
using System.Collections;

public class Portalling : MonoBehaviour {

	public Transform OrangePortal;
	public Transform toPortal;


	public bool passPortal = false;
	public bool startPortal = false;


	bool respawnActive = true;

	public asteroidDirector Director;



	IEnumerator Respawn(Transform asteroid)
	{
		if(!toPortal)
		{
			if(startPortal) asteroid.position = new Vector3(OrangePortal.position.x, (1-Mathf.RoundToInt(asteroid.position.y)%2)*asteroid.position.y, 0);
			else asteroid.position = new Vector3( OrangePortal.position.x, asteroid.position.y, 0f);
		}
		else asteroid.position = new Vector3(asteroid.position.x, toPortal.position.y-Mathf.Sign (toPortal.position.y), 0f); 

		yield return new WaitForSeconds(0.1f);

		if(passPortal == true || startPortal == true) asteroid.GetComponent<Rigidbody2D>().velocity = new Vector3(-2f, Random.value*2f-1f, 0f);

		yield return new WaitForSeconds(0.1f);

		asteroid.GetComponent<Rigidbody2D>().angularVelocity = (Random.value*2f-1f)*60f;
	}



	void OnTriggerEnter2D(Collider2D Entered)
	{


		if(Entered.tag != "Bullet") 
		{
				/*
				Entered.transform.position = new Vector3( OrangePortal.position.x, Entered.transform.position.y, 0f);

				Entered.transform.rigidbody2D.velocity = new Vector3(-2f, Random.value*2f-1f, 0f);
				Entered.transform.rigidbody2D.angularVelocity = (Random.value*2f-1f)*60f;
				*/
			if(respawnActive)
			{
				StartCoroutine(Respawn(Entered.transform));
			}

			if(passPortal)
			{
				respawnActive = Director.Decrement();
			}
		}

	}
}
