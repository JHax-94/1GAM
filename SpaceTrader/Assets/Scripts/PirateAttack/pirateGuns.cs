using UnityEngine;
using System.Collections;

public class pirateGuns : MonoBehaviour {

	public Transform motherTransform;

	public pirateShip controlSystem;

	public Transform LeftGun;
	public Transform RightGun;

	public GameObject Bullet;

	bool rightReady = true;

	public float gunCooldown = 3f;
	float cooldownTimer = 3f;


	GameObject tempObj;

	/*
	public IEnumerator()
	{
		for(int i = 0; i < 2; i ++)
		{
			cooldownTimer = gunCooldown;
			Vector3 spawnLocation = Vector3.zero;
			Quaternion spawnRotation = Quaternion.identity;
			
			
			if(rightReady)
			{
				spawnLocation = RightGun.position;
				spawnRotation = RightGun.rotation;
				rightReady = false;
			}
			else
			{
				spawnLocation = LeftGun.position;
				spawnRotation = LeftGun.rotation;
				rightReady = true;
				
			}
			
			controlSystem.shotsFired ++;
			tempObj = Instantiate(Bullet, spawnLocation, spawnRotation) as GameObject;
			tempObj.transform.parent = transform;

			yield return new WaitForSeconds(3f);
		}



	}
*/


	// Update is called once per frame
	void Update () 
	{
		if(cooldownTimer > 0)
		{
			cooldownTimer -= Time.deltaTime;
		}
		else
		{
			cooldownTimer = gunCooldown;
			Vector3 spawnLocation = Vector3.zero;
			Quaternion spawnRotation = Quaternion.identity;


			if(rightReady)
			{
				spawnLocation = RightGun.position;
				spawnRotation = RightGun.rotation;
				rightReady = false;
			}
			else
			{
				spawnLocation = LeftGun.position;
				spawnRotation = LeftGun.rotation;
				rightReady = true;

			}

			controlSystem.shotsFired ++;
			tempObj = Instantiate(Bullet, spawnLocation, spawnRotation) as GameObject;
			tempObj.transform.parent = transform.parent;

		}


	}
}
