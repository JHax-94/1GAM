using UnityEngine;
using System.Collections;

public class ActivationControl : MonoBehaviour {

	// Use this for initialization

	public pirateShip Ship;
	public pirateGuns Guns;
	public SpriteRenderer Rendering;
	public PolygonCollider2D PolyCol;

	IEnumerator Enable()
	{
		Ship.enabled = true;
		yield return new WaitForSeconds(0.1f);

		Ship.Director = transform.parent.GetComponent<DirectorAI>();

		yield return new WaitForSeconds(0.1f);

		Guns.enabled = true;

		yield return new WaitForSeconds(0.1f);

		Rendering.enabled = true;

		yield return new WaitForSeconds(0.1f);

		PolyCol.enabled = true;

		yield return new WaitForSeconds(0.1f);

		Ship.TravelTo(transform.position*(3.5f/transform.position.magnitude));

	}


	public void ActivatePirate()
	{
		Debug.Log ("Activate!");
		/*
		Ship.enabled = true;
		Ship.Director = transform.parent.GetComponent <DirectorAI>();
		Guns.enabled = true;
		Rendering.enabled = true;
		PolyCol.enabled = true;
		Ship.TravelTo (transform.position*(3.5f/transform.position.magnitude));
		*/

		StartCoroutine(Enable());
	}

}
