using UnityEngine;
using System.Collections;

public class Exploderation : MonoBehaviour {

	public ParticleEmitter Explosion;


	public void trigger()
	{
		Explosion.emit = true;

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
