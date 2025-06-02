using UnityEngine;
using System.Collections;

public class bufferOverride : MonoBehaviour 
{
	public pirateShip overrideSystem;
	public float vicRadius;

	public int direction;

	public Collider2D hitBox;

	public bool vicinity = false;

	public Transform referenceTransform;
	
	public int zoneCount = 0;

	float DistanceTo(Transform closeTrans)
	{
		Vector3 Diff = transform.position - closeTrans.position;

		return Diff.sqrMagnitude;
	}

	public void CheckBuffer()
	{
		if(referenceTransform == null)
		{
			vicinity = false;

		}
		else
		{
			if(DistanceTo(referenceTransform) > 2.5)
			{
				vicinity = false;
			}

		}




	}

	void OnTriggerEnter2D(Collider2D Entered)
	{
		//zoneCount ++;

		overrideSystem.EndTravel(true);

		if(referenceTransform == null || DistanceTo (Entered.transform) < DistanceTo(referenceTransform))
		{
			referenceTransform = Entered.transform;
			vicRadius = Entered.transform.parent.transform.position.magnitude;



			Vector3 diffVec = Entered.transform.position-transform.position;


			if(Vector3.Angle(transform.up, diffVec) > 180)
			{
				direction = 1;
			}
			else
			{
				direction = -1;
			}




			vicinity = true;
		}

	}

	public void leaveTrigger()
	{
		if(referenceTransform != null)
		{
			referenceTransform = null;
		}

		vicinity = false;
	}

	void OnTriggerExit2D()
	{
		Debug.Log ("Trigger Left!");
		if(referenceTransform != null)
		{
			referenceTransform.GetComponentInChildren<bufferOverride>().leaveTrigger();
		}
		leaveTrigger();
	}



}
