import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function Home() {
  const containerRef = useRef()
  const mouseX = useRef(0)

  useEffect(() => {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 3

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    containerRef.current.appendChild(renderer.domElement)

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6)
    directionalLight.position.set(3, 3, 3)
    scene.add(ambientLight, directionalLight)

    let loadedObject = null

    const loader = new THREE.ObjectLoader()
    loader.load(
      'https://raw.githubusercontent.com/borgirnitin/Head/main/head-compress.json',
      (object) => {
        const box = new THREE.Box3().setFromObject(object)
        const center = box.getCenter(new THREE.Vector3())
        object.position.sub(center)
        object.scale.setScalar(2)

        scene.add(object)
        loadedObject = object

        animate()
      },
      undefined,
      (error) => {
        console.error('Failed to load model:', error)
      }
    )

    const animate = () => {
      requestAnimationFrame(animate)
      if (loadedObject) {
        loadedObject.rotation.y = mouseX.current * Math.PI
      }
      renderer.render(scene, camera)
    }

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    const handleMouseMove = (event) => {
      mouseX.current = (event.clientX / window.innerWidth - 0.5) * 2
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      renderer.dispose()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: '#0a0a0a',
        overflow: 'hidden',
        position: 'relative'
      }}
    />
  )
}
