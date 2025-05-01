import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function Home() {
  const containerRef = useRef()

  useEffect(() => {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 2.5

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    containerRef.current.appendChild(renderer.domElement)

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7)
    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.6)
    directionalLight1.position.set(5, 5, 5)
    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.4)
    directionalLight2.position.set(-5, -5, -5)
    scene.add(ambientLight, directionalLight1, directionalLight2)

    const loader = new THREE.ObjectLoader()
    const geometry = new THREE.BoxGeometry()
const material = new THREE.MeshStandardMaterial({ color: 'red' })
const cube = new THREE.Mesh(geometry, material)
scene.add(cube)

const animate = () => {
  requestAnimationFrame(animate)
  cube.rotation.y += 0.01
  renderer.render(scene, camera)
}
animate()
      },
      undefined,
      function (error) {
        console.error('Error loading model:', error)
      }
    )

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
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
        position: 'relative',
        borderRadius: '16px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.35)'
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 16,
          left: 20,
          color: '#ffffff90',
          fontSize: '14px',
          fontFamily: 'sans-serif',
          zIndex: 10
        }}
      >
        Drag to rotate
      </div>
    </div>
  )
}
