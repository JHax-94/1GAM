using UnityEngine;
using System.Collections;

public class MotherShipCollision : MonoBehaviour {

	public motherShip shipStats;

	void OnCollisionEnter2D(Collision2D Hit)
	{
		Debug.Log ("HIT!");
		if(Hit.collider.tag != "Bullet")
		{
			shipStats.HullIntegrity -= Mathf.CeilToInt(Hit.relativeVelocity.magnitude*Hit.transform.GetComponent<Rigidbody2D>().mass)*100;
		}
		else
		{
			shipStats.HullIntegrity -= 50;
		}
		
	}

	/*
	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
	
	}
	*/
}
