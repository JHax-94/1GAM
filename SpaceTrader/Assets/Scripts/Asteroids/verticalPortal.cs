using UnityEngine;
using System.Collections;

public class verticalPortal : MonoBehaviour {

	public Transform OrangePortal;

	void OnTriggerEnter2D(Collider2D Enter)
	{
		//float random_Y = Random.value*4f-8f;


		Enter.transform.position = new Vector3(Enter.transform.position.x, OrangePortal.position.y, 0f);  



		Rigidbody2D asteroidMech = Enter.transform.GetComponent<Rigidbody2D>();

		asteroidMech.velocity = new Vector2(asteroidMech.velocity.x, Mathf.Sign (-OrangePortal.position.y)*Mathf.Abs (asteroidMech.velocity.y));


	}
}
