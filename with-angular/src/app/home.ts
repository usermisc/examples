import { Component, signal, inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Product {
  id: string;
  name: string;
  description?: string;
}

@Component({
  selector: 'app-home',
  imports: [FormsModule, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="container">
      <h1>Polar Products</h1>
      
      <div class="portal-form">
        <h2>Customer Portal</h2>
        <form (submit)="openPortal($event)" class="form">
          <input
            type="email"
            name="email"
            [(ngModel)]="email"
            placeholder="Email"
            required
            class="input"
          />
          <button type="submit" class="button">Open Customer Portal</button>
        </form>
      </div>

      <div class="products">
        <h2>Available Products</h2>
        @if (loading()) {
          <p>Loading products...</p>
        } @else if (error()) {
          <p class="error">{{ error() }}</p>
        } @else if (products().length === 0) {
          <p>No products available.</p>
        } @else {
          <div class="product-list">
            @for (product of products(); track product.id) {
              <div class="product-card">
                <h3>{{ product.name }}</h3>
                @if (product.description) {
                  <p>{{ product.description }}</p>
                }
                <a
                  [href]="'/checkout?products=' + product.id"
                  target="_blank"
                  class="button"
                >
                  Buy Now
                </a>
              </div>
            }
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }

    h1 {
      font-size: 2.5rem;
      margin-bottom: 2rem;
      color: #1a1a1a;
    }

    h2 {
      font-size: 1.75rem;
      margin-bottom: 1rem;
      color: #333;
    }

    .portal-form {
      background: #f5f5f5;
      padding: 2rem;
      border-radius: 8px;
      margin-bottom: 3rem;
    }

    .form {
      display: flex;
      gap: 1rem;
      max-width: 500px;
    }

    .input {
      flex: 1;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
    }

    .input:focus {
      outline: none;
      border-color: #0070f3;
    }

    .button {
      padding: 0.75rem 1.5rem;
      background: #0070f3;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 1rem;
      cursor: pointer;
      text-decoration: none;
      display: inline-block;
      text-align: center;
    }

    .button:hover {
      background: #0051cc;
    }

    .products {
      margin-top: 3rem;
    }

    .product-list {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 2rem;
      margin-top: 1.5rem;
    }

    .product-card {
      background: white;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      padding: 1.5rem;
      transition: box-shadow 0.2s;
    }

    .product-card:hover {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    .product-card h3 {
      margin: 0 0 0.5rem 0;
      font-size: 1.25rem;
      color: #1a1a1a;
    }

    .product-card p {
      margin: 0 0 1rem 0;
      color: #666;
      line-height: 1.5;
    }

    .error {
      color: #d32f2f;
      padding: 1rem;
      background: #ffebee;
      border-radius: 4px;
    }

    @media (max-width: 768px) {
      .form {
        flex-direction: column;
      }

      .product-list {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class HomeComponent implements OnInit {
  private readonly http = inject(HttpClient);
  
  protected readonly products = signal<Product[]>([]);
  protected readonly loading = signal(true);
  protected readonly error = signal<string | null>(null);
  protected email = '';

  ngOnInit(): void {
    this.loadProducts();
  }

  private loadProducts(): void {
    this.loading.set(true);
    this.error.set(null);

    this.http.get<Product[]>('/api/products').subscribe({
      next: (data) => {
        this.products.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Failed to load products. Please try again later.');
        this.loading.set(false);
        console.error('Error loading products:', err);
      }
    });
  }

  protected openPortal(event: Event): void {
    event.preventDefault();
    if (this.email) {
      window.location.href = `/portal?email=${encodeURIComponent(this.email)}`;
    }
  }
}
