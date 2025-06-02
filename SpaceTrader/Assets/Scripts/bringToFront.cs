using UnityEngine;
using System.Collections;

public class bringToFront : MonoBehaviour {

	public ParticleRenderer particles;


	void Start () 
	{
		particles.sortingLayerName = "Foreground";
	}
	

}
