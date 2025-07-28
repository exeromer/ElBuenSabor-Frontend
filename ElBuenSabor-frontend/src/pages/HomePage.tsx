import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner, Alert, Button } from 'react-bootstrap';
import Contenedor from '../components/utils/Contenedor/Contenedor';
import Titulo from '../components/utils/Titulo/Titulo';
import Nosotros from '../components/common/Nosotros/Nosotros';
import ProductCard from '../components/products/Card/ProductCard';
import PromocionesSlider from '../components/promociones/Slider/PromocionesSlider';
import { ArticuloManufacturadoService } from '../services/articuloManufacturadoService';
import { useSucursal } from '../context/SucursalContext';
import { PromocionService } from '../services/PromocionService';
import type { ArticuloManufacturadoResponse, PromocionResponse, SucursalSimpleResponse } from '../types/types';
import { useNavigate } from 'react-router-dom';
import './HomePage.sass';

const HomePage: React.FC = () => {
  const { selectedSucursal } = useSucursal();
  const [productos, setProductos] = useState<ArticuloManufacturadoResponse[]>([]);
  const [promociones, setPromociones] = useState<PromocionResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchHomePageData = async () => {
      if (!selectedSucursal) {
        setLoading(false);
        setProductos([]);
        setPromociones([]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const [fetchedProducts, fetchedPromotions] = await Promise.all([
          ArticuloManufacturadoService.getAll(),
          PromocionService.getAll()
        ]);

        const idsCategoriasDeSucursal = selectedSucursal.categorias.map(c => c.id);

        const productosDeLaSucursal = fetchedProducts.filter(p =>
          p.estadoActivo && idsCategoriasDeSucursal.includes(p.categoria.id)
        );
        setProductos(productosDeLaSucursal);

        const promocionesDeLaSucursal = fetchedPromotions.filter((promo: PromocionResponse) =>
          promo.estadoActivo &&
          promo.sucursales.some((suc: SucursalSimpleResponse) => suc.id === selectedSucursal.id)
        );
        setPromociones(promocionesDeLaSucursal);

      } catch (err) {
        console.error('Error al cargar datos del Home:', err);
        setError("No se pudieron cargar los datos. Intenta de nuevo más tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchHomePageData();
  }, [selectedSucursal]);

  if (loading) {
    return (
      <Container className="text-center my-5">
        <Spinner animation="border" variant="primary" />
        <p>Cargando...</p>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <Contenedor className='hero-banner mb-5'>
        <div className="hero-content">
          <Titulo texto='Bienvenido a El Buen Sabor' nivel='titulo' />
          <p className="lead">Tu destino para las mejores comidas con entrega rápida.</p>
          <hr className="my-4" />
          <p>Explora nuestro menú y descubre sabores que te encantarán.</p>
          <Button variant="primary" size="lg" onClick={() => navigate('/products')}>
            Ver Menú
          </Button>
        </div>
      </Contenedor>

      {!selectedSucursal ? (
        <Alert variant="info" className="text-center">Por favor, selecciona una sucursal en el menú superior para ver nuestro catálogo y promociones.</Alert>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <>
          {promociones.length > 0 && (
            <div className="mt-5">
              <Titulo texto="Nuestras Promociones" nivel="subtitulo" />
              <PromocionesSlider promociones={promociones} />
            </div>
          )}

          <div className="mt-5">
            <Titulo texto="Productos Destacados" nivel="subtitulo" />
            <Row xs={1} md={2} lg={3} xl={4} className="g-4">
              {productos.slice(0, 4).map(producto => (
                <Col key={producto.id}>
                  <ProductCard product={producto} />
                </Col>
              ))}
            </Row>
            {productos.length === 0 && promociones.length === 0 && (
              <Alert variant="info">No hay productos ni promociones disponibles para esta sucursal en este momento.</Alert>
            )}
          </div>
        </>
      )}

      <div className="mt-5">
        <Nosotros />
      </div>
    </Container>
  );
};

export default HomePage;