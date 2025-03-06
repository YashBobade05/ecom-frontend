import styles from './BrandLogos.module.css';


const BrandLogos = () => {
    const brandLinks = [
      // { name: "Levi's", url: '/assets/levis.png', site: 'https://www.levi.com' },
      // { name: "John Players", url: 'assets/johnplayer.png', site: 'https://www.johnplayers.com' },
      // { name: "Puma", url: '/assets/puma.png', site: 'https://www.puma.com' },
      // { name: "Nike", url: '/assets/nike.png', site: 'https://www.nike.com' },
      // { name: "Gucci", url: '/assets/gucci.png', site: 'https://www.gucci.com' },
      // { name: "Fastrack", url: '/assets/fastrack.png', site: 'https://www.fastrack.in' },
      // { name: "Pepe Jeans", url: '/assets/pepejeans.png', site: 'https://www.pepejeans.com' },
      // { name: "Adidas", url: '/assets/adidas.png', site: 'https://www.adidas.com' }

      { name: "Levi's", url: '/assets/levis.png', site: '' },
      { name: "John Players", url: 'assets/johnplayer.png', site: '' },
      { name: "Puma", url: '/assets/puma.png', site: '' },
      { name: "Nike", url: '/assets/nike.png', site: '' },
      { name: "Gucci", url: '/assets/gucci.png', site: '' },
      { name: "Fastrack", url: '/assets/fastrack.png', site: '' },
      { name: "Pepe Jeans", url: '/assets/pepejeans.png', site: '' },
      { name: "Adidas", url: '/assets/adidas.png', site: '' }
    ];
  
    return (
      <div className={styles.brandSection}>
        <h2 className={styles.heading}>Shop by Brand</h2>
        <p className={styles.subheading}>
          Select Your Favorite Brands And Purchase
        </p>
        <div className={styles.brandContainer}>
          {brandLinks.map((brand, index) => (
            <a 
              key={index} 
              href={brand.site} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <img 
                src={brand.url} 
                alt={brand.name} 
                className={styles.brandLogo} 
              />
            </a>
          ))}
        </div>
      </div>
    );
  };
  
  export default BrandLogos;