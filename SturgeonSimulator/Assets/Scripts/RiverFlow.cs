using UnityEngine;
using System.Collections;

public class RiverFlow : MonoBehaviour 
{
	public float riverFlow = 1f;
	public float Grav;


	IEnumerator AccelerateRiver()
	{
		while(Time.timeScale > 0)
		{

			riverFlow += 0.01f;

			Physics2D.gravity = new Vector2(riverFlow, Grav);
		
			yield return new  WaitForSeconds(5f);
		}

	}





	// Use this for initialization
	void Start () 
	{
		Grav = Physics2D.gravity.y;

		Physics2D.gravity = new Vector2(riverFlow, Grav);

		StartCoroutine(AccelerateRiver());
	}
	/*
	// Update is called once per frame
	void Update () {
	
	}
	*/

	




}
