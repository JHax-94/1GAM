using UnityEngine;
using System.Collections;

public class wallKick : MonoBehaviour {

	void OnCollisionEnter2D(Collision2D Bounce)
	{
		Bounce.transform.GetComponent<Rigidbody2D>().AddForce( new Vector2(0f, -Bounce.relativeVelocity.magnitude));
	}
}
