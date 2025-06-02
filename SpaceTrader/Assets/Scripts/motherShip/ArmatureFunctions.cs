using UnityEngine;
using System.Collections;

public class ArmatureFunctions : MonoBehaviour {

	public Transform pirateShip;

    public void ShiftShip(int index)
    {
        pirateShip.position = new Vector2(pirateShip.position.x + index*2, pirateShip.position.y);
        


    }

	public void RotateShip()
	{

		GetComponent<Rigidbody2D>().angularVelocity = 40f;

	}




	// Use this for initialization
	void Start () 
	{
		//rigidbody2D.angularVelocity = 40f;
		pirateShip.position = transform.position + new Vector3(0, 3, 0);
	}
/*	
	// Update is called once per frame
	void Update () {
	
	}
 */   
}
