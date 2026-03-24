import * as React from "react";
import { NavMain } from "./NavMain";
import { NavUser } from "./NavUser";
//import { useAuth } from "@/app/providers/AuthContext";

// Componentes de shadcn
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
//import { Skeleton } from "../components/ui/skeleton";

// Iconos
import {
  BarChart3,
  Beer,
  Settings,
  Barrel,
  Box,
  LayoutDashboard,
} from "lucide-react";

// Logo 
//import MainLogo from "../../../public/images/logo_carmina.png"

export function AppSidebar({ ...props }) {
  //const { authUser, isLoading } = useAuth();

/*   if (isLoading) {
    return(
      <Skeleton />
    )
  } */
  
  // Datos de navegación
  const data = {
    user: {
      full_name:  "Usuario",
      role: "Invitado",
      avatar: "",
    },

    navMain: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard,
        isActive: true,
      },
  
      {
        title: "Administración",
        url: "#",
        icon: Settings,
        items: [
          {
            title: "Usuarios",
            url: "/admin/usuarios",
          },
          {
            title: "Configuración",
            url: "/admin/configuracion",
          },
          {
            title: "Mi Perfil",
            url: "/admin/perfil",
          },
        ],
      },
    ],
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        {/* Logo */}
        <div className="flex items-center justify-center py-2">
          {/* Cuando está expandido muestra logo */}
          <div className="flex flex-col items-center gap-2 group-data-[collapsible=icon]:hidden transition-all">
            {
              <img
                src={"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAQDw0NEBAQDQ0NDQ0NDQ0NDw8NDQ0NFREWFhURFRUYHSggGBolGxUVITEhJSkrLi4uFx8zODM4Nyg5OisBCgoKDg0NFQ4NFSsZFRkrKystNysrKy0tLTg4KysrKy0uKy4rKy0tKy0rKzctKy0rKy0tKys3LSsrKysrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAaAAADAQEBAQAAAAAAAAAAAAAAAQIDBQQG/8QANxAAAgECBQIDBwIEBwEAAAAAAAECAxEEBRIhMRNRBkFhFBUiMnGh8EKxJXKRwTM0NVJigfEk/8QAGQEBAQEBAQEAAAAAAAAAAAAAAAECAwQF/8QAIxEBAQEAAgIBBAMBAAAAAAAAAAERAhIDFAQTMWFxIUFRIv/aAAwDAQACEQMRAD8A5OQwXXjsjo5jXccXGK4ujmZRVUK0ZPg9WaYmMsVGceLo9Lw3Xo8QUY+00XZb6bmniGeidNR2Wx5s+xkZ1KU4v5UjoSxVCtGnKb3jYMZXn8SU06NGVldo5eQU17RC6XJ68+x0ammEflic7A1nCpGS5TQa/p18amsakltdeReb00sVS2X6ToRqU51YScfi28jn+IaqWIpy7WDK81ppYujsvLyPJ4pglVjZJbInMsxUq1Oov02MM5xnWmpLySQ1qR6fC0V1J3SewsBC2Nats5PyPHlWL6VTX3PXUzOLrxqpccjVxnncEsVwuV5Ht8S01ootJfKjl5li+pV6i7ovMcwdWMI/7UTtDG/hiC6z2XB6cFCKx07pWuzlZZjOjPWTUxj6vW4d7jYWPpsVojW/w1q72PJhZKeLXwpWXYwWfbJtXklyc+GYyVXrLZjtGete6rBLHLZfMb5pCKxlJ2XkcWeMcqvW87lYvGSqTjUfMeB2jXV2s5wLliKc4xVvh4MvFdFJ09l8u/8AQ88M9nZJ7uK2PJmGPlWab8idoY18PwXtEdkejHQSxi2XKOXh60oS1x5HVxEpT6j5Q7RbHbzvTHFUnZfp7HSx6blB04pprmy5sfJYnEynLVJ3e32PRRzapFWT28h3idXqzeT6lJSS+Y9mfYeMqdKpG1lFXODisRKb1Se43i5uKjduPYd4l4uloXZf0AjV+XGO8T+XN6EuwOjLsz6HprsJ0l2Pm+27Pn/Z5dio4WZ3umuw3Ant0xwvZJdiqOGkpJ24O0oj0D26liljmkvhV0jkY6nOrPUzqaB6SX5lJxcJYKXYr2GR3EgsPbq2OJ7vkCy5ndRLiS/KqOKsvY1lzO1pH0zHtclcX3cyvdx2dInEe1THHjlo3lp17DsT2quOUstH7sOvEZL8rkmOQssRSyxHVsGoe1yTHL92In3cjrORE7GfZ5Ljl+74jWBieuTE2PZ5Ljze74suGAibAPZ5GI9jiMq4D2eSY3aBRK0lJHnGekdiwNCNI9JYgJ0hpKGiiLC0morEGdhldMegBKIykgcQuMpIEjTQNUxioUQsaWfYNL7FxUJAy9LKVMmIyQmjZ0/QTgxgxaJsepUwdP0JivFOFzNwPf02DpExK8SiPSbypsFFgxho9APRYAmN+ku4tEe5kJIqN1Sh3Dpw7mVhaSaNVGI1GJlYdho20wJ+EzC40W5R7FRnDsYsQ0burHyQurHsZpBYo16kew+rHsecbZttq6q7Cdf0ITCwFqv6D6zIAAdVjjWZNhXA16jIlUY4gzNCjUZXUYrIZNC6jJdRjaIaIgc2YybN7CmgMLy7gXoADQCyAzikAMlzBgAa3GDEjQNFAxMiWaMiwDuUiCi4uE0Kw2xRZtoWNBCBhiaFcpMxoQkihFlDuBI7koW5aEmBFO5LQNi1AJlBcTANwGAZJMRKluXJbXDeRRnKI4TLB1TEaAdwYTBDJbCYYXFcJIphNhqAGkbMMBBYNYFIozsUjJh3BMHEpRMoBXKIaLA7CsNDTFMNIBCIBolxKBhIURiRelMCQHpAJjHSaJ+TMtRDmw6Y1hCxozOnNvkeo0qkFxNi1BTQhXLQxE2GmJzBMJYciWNyE2DAkNzYlIJ3tsAtXqVFnMw+DrSk23pinsr7HShTa2e7LeORNWpFXIsJsxEEqjBSBMLosWKb2JTKQmbVVxCTLRipUoGXYLEZxmwRTQGgawFb0GB5XIb3DSDZHTVXBAhoqpc2Sm2ypy9ATBq2JTsCJaBp3KiZ2HG4TVNA0AyWppJHWy3LJzWpr4fscuJ9HS8UYajTjTbSdt+D0eDxzlWLyxxcbRqdVQgvhvvsZ1IuLs+TtQ8Q4STbi1qf0ucbGVVOcpLh8M15/H1iTlrJsA0glY8jQsJwQ2xFWGCQmxxkNKQ0xskai9QrklRRBDkNSK0hpCEA9IwrFk6SikjGtJQJjYJGtXRIhI0QaRqCxJbI37CBtlKZmwRWTKM5SKiyUWj57PMnqTfUTaXo2d86U1GVJLa56fjeTpWOU18JlmWTvazbXmfVYeg4wSlyjqZDCmpuMkrvzZlmlNRm0ndeVjp8jyd+KTi8jZLY3JGLnueNtpyUopGaYNhYppCsKKLkthgRNiooGRDRSZncakVWiHsZ6xJga3Az1DAwbKUiGhIw0vUNMgoB3KUyAYDbGqgQQ3ECG7kmukmxYxS0jNIoUomhGv0KVZhYEgqlNrdbMidWUubjaCKKibCkrmkhRIqIMsVighWBsUq0U1FtKT4RVi4qFcpDSBkREg0gpehaCoSLjwOwgAAADC4AEjDWmgEguE00xkjQVcGannTNFMCpEFiLGTTPPVx0Iy0OSTtfc9B8Jm0HUzNU7tJr7Hfx8O26PrPe1K9tS/7Lr5jThzJLa58/n2SRhh5VIN64K5j4ay54iiqlVt32Rv6fHO3+D6nC42FX5ZJm1SrGKu2kl3PiqNN4bMI0ot6Zq9j0eK8e+tSwyelSfxsn0v8AqSfamPofe1Ju2pHspyTV01Z7o+TxeBw6pPTP41G97+Zr4ax86mFqq9509STF8czeJju1szpQbTkr/sb4bFQmrxaf05PiMijCo6nXlaep7P6nYyrL5U8Q5QlqpNcX4HLxSfse7H0E8TSnrs1+m/J2Lf2Pkc7qNZlhley7eR9dczzmTiGxNADZyQlYAAKpR9RMTZLmBVwJ1CCJaE0UxGFCQWQrMYBpFYtMm4CaBIbGFjSKJY4SBlhTR8XXX8Wj/KfZ3ORPJ08T7Tf4kjv4+fXf0K8S/wCVrfynl8F7YSH1Z1MdhurTlTfElYjK8vVCkqa3SbE5z6d4o+azL/VKD/4sw8VYf/7KM5fJLZvsfR18ojLEQxF/ij5G+aZXGurS5XDOk8sl4/g1yVlFBxUnPZq/J6ctpUqFGpOnvHe9vMwXhyS+HW9P1Ozg8vjCn0uV5k5cpn3HBoYXD4hOpF6JPlJ23PJl2InSxvQjLXBr62OlU8N2lKVOWlN3sevKcjjSm6knqm/N8lvPjJYONni/iWFPrlL+xzsXlEZ16dd7uB0HE5c+ezj+BoSwjIqxzT7ITHcEOwCaJ0mhLClp9RCsMIGILjMKaES2AFEWKuSg1DkxiaKGKSZcWZlRZYimikHqBrQAmAwyWkpRFH6lSYE3EKQkwKaGkJMbAVhsQATFbjkhAExKZdyWguFxVxMSAAsA9QAYjbY7oVzn/IEhtAmh3XcNM1yaIgu5QxSZLkVYsoaAGguKKi7qxUY9zOMjdNW5/YRKhikU7dydjSIiaXFZd/uguu/3QZPQLSWqiJbC6kY9P5dC27/sDTQBG3f7oba/GgaVhWK1L8sDQNTYWkG2XBd/3QXU2QNC8/8AwG/y4TU9N9wHrX4wBryAAEUIYAZaAAAEMpABuCWAAKKKXAASJVjYAVHnYwAMtIlMAAlmYAA4FsAATJAAKYxABmuS2AAIAAD/2Q=="}
                alt="Carmina Burana"
                className="h-12 w-auto -mt-1.5 select-none"
              />
            }
          </div>

          {/* Cuando está contraído solo muestra el isologo */}
          <div className="hidden group-data-[collapsible=icon]:flex items-center justify-center transition-all">
            {
              <img
                src=""
                alt="BRU"
                className="w-8 -mt-1"
              />
            }
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>

      <SidebarFooter>
        {/* {authUser ? <NavUser user={data.user} /> : <Skeleton />} */}
        <NavUser user={data.user} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
